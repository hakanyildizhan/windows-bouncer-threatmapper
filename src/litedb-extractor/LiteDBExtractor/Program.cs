using Microsoft.Extensions.Configuration;

namespace LiteDBExtractor
{
    class Program
    {
        async static Task Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
               .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
            var config = builder.Build();

            Console.Write("Type the full path of the LiteDB file: ");
            string path = Console.ReadLine();

            if (!File.Exists(path))
            {
                Console.WriteLine("No such file exists. Aborting.");
            }
            else
            {
                Console.Write("Type the desired (full) path for the output file. Leave blank and press Enter to ouput the file to the same folder as this tools's executible: ");
                string outputPath = Console.ReadLine();

                try
                {
                    string apiKey = config.GetSection("ipDataToken").Value;
                    var extractor = new Extractor(apiKey, path, outputPath);
                    var outputFile = extractor.Extract();
                    Console.WriteLine("Operation complete. JSON output file is placed here: " + outputFile);
                }
                catch
                {
                    Console.WriteLine("An error has occurred. Aborting.");
                }
            }

            Console.ReadLine();
        }
    }
}