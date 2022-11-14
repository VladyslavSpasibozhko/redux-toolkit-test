import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery, useUpdateUserMutation } from 'src/store/api';
import Loader from 'src/components/Loader';

const getEntries = (user) => {
  const entries = Object.entries(user);

  return entries
    .filter(([_, value]) => typeof value !== 'object')
    .map(([key, value]) => ({
      label: key,
      value,
    }));
};

const getInitialValues = (entries) => {
  return entries.reduce((acc, { label, value }) => {
    acc[label] = value;
    return acc;
  }, {});
};

function toUpper(value) {
  return value.replace(value[0], value[0].toUpperCase());
}

function DetailsRow({ row }) {
  const key = row.label + row.value;

  return (
    <div key={key} className="mt-10">
      <div className="flex items-center">
        <h3
          className="mr-10"
          style={{
            color: '#909090',
          }}
        >{`${toUpper(row.label)}: `}</h3>

        {row.value && <h3>{row.value}</h3>}
      </div>
    </div>
  );
}

function FormField({ label, value, name, disabled, onChange }) {
  return (
    <div className="mt-10">
      <label style={{ display: 'block' }} htmlFor={name}>
        {toUpper(label)}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

function UserEditForm({ initial, onSubmit }) {
  const [values, setValues] = useState(initial);

  const isDirty = (initial, values) => {
    return !Object.entries(initial).every(([key, value]) => {
      const currentValue = values[key];

      return value === currentValue;
    });
  };

  const getValue = (key) => {
    return values[key];
  };

  const onChange = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitForm = () => {
    onSubmit(values);
  };

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  return (
    <form>
      {Object.keys(initial).map((key) => (
        <FormField
          key={key}
          label={key}
          value={getValue(key)}
          name={key}
          onChange={onChange}
          disabled={key === 'id'}
        />
      ))}
      <div className="mt-10">
        <button
          type="button"
          onClick={onSubmitForm}
          disabled={!isDirty(initial, values)}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

function UserEditFormContainer({ id }) {
  const { data, isFetching } = useGetUserQuery(+id);

  const entries = useMemo(() => getEntries(data || {}), [data]);
  const initial = useMemo(() => getInitialValues(entries), [entries]);

  const [update] = useUpdateUserMutation();

  const onSubmit = (data) => {
    update(data);
  };

  if (isFetching) return <Loader />;

  return (
    <div className="mr-20">
      <UserEditForm initial={initial} onSubmit={onSubmit} />
    </div>
  );
}

function UserDetails({ id, className }) {
  const { isFetching, data } = useGetUserQuery(+id);
  const entries = getEntries(data || {});

  if (isFetching) return <Loader />;

  return (
    <div className={className}>
      {entries.map((row) => (
        <DetailsRow key={row.label + row.value} row={row} />
      ))}
    </div>
  );
}

export default function UserEdit() {
  const { id } = useParams();

  return (
    <div>
      <h2>Edit User</h2>
      <div className="mt-20 flex">
        <UserDetails id={+id} className="mr-20" />
        <UserEditFormContainer id={+id} />
      </div>
    </div>
  );
}
