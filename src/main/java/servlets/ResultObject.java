package servlets;

public class ResultObject {
    private String result;
    private String x;
    private String y;
    private String r;
    private String execTime;
    private String currentTime;

    public ResultObject(String result, String x, String y, String r, String execTime, String currentTime) {
        this.result = result;
        this.x = x;
        this.y = y;
        this.r = r;
        this.execTime = execTime;
        this.currentTime = currentTime;
    }

    public String getResult() {
        return result;
    }

    public String getX() {
        return x;
    }

    public String getY() {
        return y;
    }

    public String getR() {
        return r;
    }

    public String getExecTime() {
        return execTime;
    }

    public String getCurrentTime() {
        return currentTime;
    }
}
