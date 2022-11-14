import { useGetCommentsQuery, useUpdateCommentMutation } from 'src/store/api';
import { useState } from 'react';
import Loader from 'src/components/Loader';
import NoResults from 'src/components/NoResults';

function Pagination({ page = 1, limit = 10, onChangePage, onChangeLimit }) {
  const [limitOptions] = useState([10, 20, 30, 40, 50]);

  const changeLimit = (e) => {
    onChangeLimit(+e.target.value);
  };

  const increasePage = () => {
    onChangePage(page + 1);
  };

  const decreasePage = () => {
    onChangePage(page - 1);
  };

  return (
    <div className="mt-20 flex items-center">
      <div className="mr-10 flex items-center">
        <h3 className="mr-10">
          Page: <span>{page}</span>
        </h3>
        <div>
          <button className="mr-5" disabled={page === 1} onClick={decreasePage}>
            Previous page {page - 1}
          </button>
          <button className="mr-5" onClick={increasePage}>
            Next page {page + 1}
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <h3 className="mr-10">
          Limit: <span>{limit}</span>
        </h3>
        <div>
          <select value={limit} onChange={changeLimit}>
            {limitOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function CommentEdit({ title, body, onSubmit, onCancel }) {
  const [_title, _setTitle] = useState(title);
  const [_body, _setBody] = useState(body);

  function submitForm() {
    onSubmit({
      title: _title,
      body: _body,
    });
  }

  return (
    <form className="mt-10 p-5">
      <div>
        <label style={{ display: 'block' }} htmlFor="comment_title">
          Title
        </label>
        <input
          id="comment_title"
          value={_title}
          onChange={(e) => _setTitle(e.target.value)}
          className="mt-5"
          style={{ width: 400 }}
        />
      </div>
      <div className="mt-10">
        <label style={{ display: 'block' }} htmlFor="comment_body">
          Message
        </label>
        <textarea
          id="comment_body"
          value={_body}
          onChange={(e) => _setBody(e.target.value)}
          className="mt-5"
          style={{ width: 400, height: 100 }}
        />
      </div>
      <div className="flex items-center mt-10">
        <button type="button" onClick={submitForm} className="mr-10">
          Submit
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
      <hr />
    </form>
  );
}

function Comment({ title, body, isEditable, onToggleEdit }) {
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        {isEditable && <button onClick={onToggleEdit}>Edit</button>}
      </div>
      <p className="mt-5">{body}</p>
    </div>
  );
}

function CommentContainer({ id, title, body }) {
  const [edit, setEdit] = useState(false);

  const [update] = useUpdateCommentMutation();

  function onSubmitEdit(data) {
    update({ id, name: data.title, body: data.body });
  }

  if (edit)
    return (
      <CommentEdit
        title={title}
        body={body}
        onCancel={() => setEdit(false)}
        onSubmit={onSubmitEdit}
      />
    );

  return (
    <Comment
      title={title}
      body={body}
      isEditable={true}
      onToggleEdit={() => setEdit(!edit)}
    />
  );
}

export default function Comments() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data = [], isFetching } = useGetCommentsQuery({
    _page: page,
    _limit: limit,
  });

  if (isFetching) return <Loader />;

  return (
    <div>
      <h2>Comments</h2>
      {!data.length && <NoResults />}
      {!!data.length && (
        <div>
          {data.map((comment) => (
            <CommentContainer
              key={comment.id}
              id={comment.id}
              title={comment.name}
              body={comment.body}
            />
          ))}
        </div>
      )}
      <Pagination
        page={page}
        limit={limit}
        onChangePage={setPage}
        onChangeLimit={setLimit}
      />
    </div>
  );
}
