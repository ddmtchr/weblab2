package servlets;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ResultBean implements Serializable {
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
