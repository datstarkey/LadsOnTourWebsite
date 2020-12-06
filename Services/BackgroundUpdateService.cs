using LadsOnTour.RaidItems;
using Microsoft.EntityFrameworkCore.Internal;
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
        private bool runOnce = true;

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
                        var context = scope.ServiceProvider.GetRequiredService<LadsOnTour.Models.DatabaseContext>();

                        if (runOnce)
                        {
                            await armory.AddRaidItemsToDb(CastleNatharia.AllItems);
                            runOnce = false;
                        }

                        await armory.UpdateAllCharacters();
                        await armory.SetGuildRanks("", true);

                        var userService = scope.ServiceProvider.GetRequiredService<UserService>();
                        userService.UpdateAll();
                    }
                    catch (Exception e)
                    {
                        Console.WriteLine(e.Message);
                    }
                }

                Console.WriteLine($"Finished Updating All Characters");
                await Task.Delay(3600000, stoppingToken);
            }
        }
    }
}