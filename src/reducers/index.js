import {
    RECEIVE_LINKS,
    REQUEST_LINKS,
    RECEIVE_TOPICS,
    START_ADD,
    SELECT_TOPIC,
    VOTE_LINK,
    CANCEL_ADD,
} from '../actions';


const defaultState = {
    topics: [],
    links: [],
    selectedTopic: {
        name: '',
        description: '',
    },
    loadingLinks: false,
    adding: false,
};

function mainStore(state = defaultState, action) {
    switch (action.type) {
    case RECEIVE_LINKS:
        return Object.assign({}, state, {
            links: action.links,
            loadingLinks: false,
            adding: false,
        });
    case REQUEST_LINKS:
        return Object.assign({}, state, {
            loadingLinks: true,
        });
    case RECEIVE_TOPICS:
        return Object.assign({}, state, {
            selectedTopic: action.topics[0],
            topics: action.topics,
        });
    case START_ADD:
        return Object.assign({}, state, {
            adding: true,
        });
    case SELECT_TOPIC:
        return Object.assign({}, state, {
            selectedTopic: action.topic,
        });
    case CANCEL_ADD:
        return Object.assign({}, state, {
            adding: false,
        });
    case VOTE_LINK:
        const linkIndex = state.links.indexOf(action.link);
        return Object.assign({}, state, {
            links: [
                ...state.links.slice(0, linkIndex),
                Object.assign({}, state.links[linkIndex], {
                    voteCount: state.links[linkIndex].voteCount + action.increment,
                }),
                ...state.links.slice(linkIndex + 1)
            ],
        });
    default:
        return state;
    }
}

export default mainStore;
