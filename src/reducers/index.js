import { combineReducers } from 'redux';
import { problemTitleReducer, problemTitleHasErrored, problemTitleIsLoading} from './problem/ProblemTitleReducer';
import { problemContentReducer, problemContentsHasErrored, problemContentsIsLoading } from './problem/ProblemContentReducer';
import { solutionTitleReducer, solutionTitleHasErrored, solutionTitleIsLoading} from './solution/SolutionTitleReducer';
import { solutionContentReducer, solutionContentsHasErrored, solutionContentsIsLoading } from './solution/SolutionContentReducer';
import { loginReducer} from './sso';
export default combineReducers({
    problemTitles: problemTitleReducer,
    problemTitleHasErrored,
    problemTitleIsLoading,
    problemContents: problemContentReducer,
    problemContentsHasErrored,
    problemContentsIsLoading,
    loginReducer,
    solutionTitles: solutionTitleReducer,
    solutionTitleHasErrored,
    solutionTitleIsLoading,
    solutionContents: solutionContentReducer,
    solutionContentsHasErrored,
    solutionContentsIsLoading


});
