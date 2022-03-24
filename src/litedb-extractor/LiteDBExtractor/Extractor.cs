using IpData;
using IpData.Models;
using LiteDB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LiteDBExtractor
{
    public class Extractor
    {
        private string _liteDBfile;
        private string _outputPath;
        private string _apiKey;

        public Extractor(string apiKey, string liteDBFile, string outputPath = "")
        {
            _apiKey = apiKey;
            _liteDBfile = liteDBFile;
            _outputPath = outputPath;
        }

        public string Extract()
        {
            var records = new List<Record>();

            using (var db = new LiteDatabase(@$"Filename=""{_liteDBfile}"""))
            {
                var collection = db.GetCollection<Record>("loginattempts");
                records = collection.FindAll().ToList();
            }

            if (records.Count == 0)
            {
                throw new Exception("No data");
            }

            var client = new IpDataClient(_apiKey);
            var processedRecords = new List<ProcessedRecord>();

            foreach (var row in records)
            {
                string ip = IPAddress.Parse(row.Ip.ToString()).ToString();
                var ipInfo = Task<IpInfo>.Run(async () => { return await client.Lookup(ip); });

                var processedRecord = new ProcessedRecord();
                processedRecord.Login = row.Login;
                processedRecord.Date = row.Date;
                processedRecord.Ip = ip;

                ipInfo.Wait();

                if (ipInfo == null)
                {
                    Console.WriteLine($"No info for IP {ip}");
                    continue;
                }

                processedRecord.Country = ipInfo.Result.CountryName;
                processedRecord.Latitude = ipInfo.Result.Latitude;
                processedRecord.Longtitude = ipInfo.Result.Longitude;
                processedRecord.IpInfo = ipInfo.Result;

                processedRecords.Add(processedRecord);
            }

            if (string.IsNullOrEmpty(_outputPath))
            {
                _outputPath = Path.Combine(Directory.GetParent(Assembly.GetExecutingAssembly().Location).FullName, "data.json");
            }

            File.WriteAllText(_outputPath, JsonConvert.SerializeObject(processedRecords, Formatting.Indented));
            return _outputPath;
        }
    }
}
