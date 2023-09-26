package servlets;

import java.util.ArrayList;
import java.util.List;

public class ResultBean {
    private List<ResultObject> previousResults;

    public ResultBean() {
        previousResults = new ArrayList<>();
    }

    public List<ResultObject> getPreviousResults() {
        return previousResults;
    }

    public void setPreviousResults(List<ResultObject> previousResults) {
        this.previousResults = previousResults;
    }

    public void addResult(ResultObject resultObject) {
        previousResults.add(resultObject);
    }

    public void clearResults() {
        previousResults.clear();
    }

}
