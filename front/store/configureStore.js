import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const confugureStore = () => {
    const sagaMiddleWare = createSagaMiddleware();
    const middlewares = [sagaMiddleWare];
    const enhancer = process.env.NODE_ENV === 'production'

        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares));

    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleWare.run(rootSaga);
    return store
};

const wrapper = createWrapper(confugureStore,
    {
        debug: process.env.NODE_ENV === 'development',
    });

export default wrapper;
