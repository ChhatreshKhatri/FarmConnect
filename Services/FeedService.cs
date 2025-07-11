using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Models;
using dotnetapp.Data;
 
 namespace dotnetapp.Services
 {
    public class FeedService
{
    private readonly ApplicationDbContext _context;
 
    public FeedService(ApplicationDbContext context)
    {
        _context = context;
    }
 
    // Retrieves and returns all feeds from the database
    public async Task<IEnumerable<Feed>> GetAllFeeds()
    {
        return await _context.Feeds.ToListAsync();
    }
 
    // Retrieves a feed from the database with the specified feedId
    public async Task<Feed> GetFeedById(int feedId)
    {
        return await _context.Feeds.FindAsync(feedId);
    }
 
    // Retrieves and returns all feeds from the database with the specified userId
    public async Task<IEnumerable<Feed>> GetFeedsByUserId(int userId)
    {
        return await _context.Feeds.Where(f => f.UserId == userId).ToListAsync();
    }
 
    // Adds a new feed to the database if it doesn't already exist
    public async Task<bool> AddFeed(Feed feed)
    {
        bool exists = await _context.Feeds.AnyAsync(f => f.FeedName == feed.FeedName && f.Type == feed.Type);
        if (exists)
        {
            // throw new FeedException("Feed with the same name and type already exists");
        }
 
        _context.Feeds.Add(feed);
        await _context.SaveChangesAsync();
        return true;
    }
 
    // Updates an existing feed record in the database
    public async Task<bool> UpdateFeed(int feedId, Feed feed)
    {
        var existingFeed = await _context.Feeds.FindAsync(feedId);
        if (existingFeed == null)
        {
            return false;
        }
 
        bool exists = await _context.Feeds.AnyAsync(f => f.FeedName == feed.FeedName && f.Type == feed.Type && f.FeedId != feedId);
        if (exists)
        {
            // throw new FeedException("Feed with the same name and type already exists");
        }
 
        existingFeed.FeedName = feed.FeedName;
        existingFeed.Type = feed.Type;
        existingFeed.Quantity = feed.Quantity; // Assuming Quantity or other fields need to be updated
        existingFeed.Description=feed.Description;
        existingFeed.Unit=feed.Unit;
        existingFeed.Image=feed.Image;
        existingFeed.PricePerUnit=feed.PricePerUnit;
 
        _context.Feeds.Update(existingFeed);
        await _context.SaveChangesAsync();
        return true;
    }
 
    // Deletes an existing feed record from the database
    public async Task<bool> DeleteFeed(int feedId)
    {
        var feed = await _context.Feeds.FindAsync(feedId);
        if (feed == null)
        {
            return false;
        }
 
        bool isReferenced = await _context.Requests.AnyAsync(r => r.FeedId == feedId); // Assuming Requests is a DbSet in your context
        if (isReferenced)
        {
            //throw new FeedException("Feed cannot be deleted, it is referenced in requests");
        }
 
        _context.Feeds.Remove(feed);
        await _context.SaveChangesAsync();
        return true;
    }
}


 



 }
