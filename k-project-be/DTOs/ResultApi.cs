namespace LoginProject.DTOs
{
    public class ResultApi
    {
        public bool Success { get; set; } = true;
        public string Error { get; set; } = "";
        public object? Data { get; set; } = null;
        public ResultApi() { }

        public ResultApi(object data)
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
