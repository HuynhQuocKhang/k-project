namespace LoginProject.DTOs
{
    public class ResultApi
    {
        public bool Success { get; set; } = true;
        public string Error { get; set; } = "";
        public dynamic? Data { get; set; } = null;
        public ResultApi() { }

        public ResultApi(dynamic data)
        {
            Success = true;
            Data = data;
        }

        public ResultApi(string error)
        {
            Success = false;
            Error = error;
        }
    }
}
