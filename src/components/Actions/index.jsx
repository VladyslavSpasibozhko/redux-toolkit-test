import { useDispatch, useSelector } from 'react-redux';
import { removeAction, removeAllActions } from '../../store/logger/logger';

export function Actions() {
  const { actions } = useSelector((state) => state.logger);
  const dispatch = useDispatch();

  return (
    <div className="w-300 ml-40 mt-20">
      <div className="flex justify-between">
        <h3>Actions</h3>
        <button onClick={() => dispatch(removeAllActions())}>Clear</button>
      </div>
      {Boolean(actions.length) && (
        <div>
          {actions.map((action, i) => (
            <div key={action.id}>
              <hr />

              <div className="flex items-center justify-between">
                <div>
                  <h5>{action.type}</h5>

                  {action.payload && (
                    <details style={{ marginTop: 10 }}>
                      <summary>Payload</summary>
                      <pre>{JSON.stringify(action.payload, null, 2)}</pre>
                    </details>
                  )}
                </div>
                <button onClick={() => dispatch(removeAction(action.id))}>
                  X
                </button>
              </div>

              {i === actions.length - 1 && <hr />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
