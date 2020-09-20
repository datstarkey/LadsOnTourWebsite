using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace LadsOnTour.Services
{
    public class BackgroundUpdateService : BackgroundService
    {
        public IServiceScopeFactory _serviceScopeFactory;

        public BackgroundUpdateService(IServiceScopeFactory serviceScopeFactory)
        {
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                Console.WriteLine($"Updating all at : {DateTimeOffset.Now}");

                using (var scope = _serviceScopeFactory.CreateScope())
                {
                    try
                    {
                        var armory = scope.ServiceProvider.GetRequiredService<BattleNetService>();
                        await armory.UpdateAllCharacters();
                        await armory.SetGuildRanks("", true);

                        var userService = scope.ServiceProvider.GetRequiredService<UserService>();
                        userService.UpdateAll();
                    }
                    catch (Exception e)
                    {
                        throw;
                    }
                }

                await Task.Delay(3600000, stoppingToken);
            }
        }
    }
}