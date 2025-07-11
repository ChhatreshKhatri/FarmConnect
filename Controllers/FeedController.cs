using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using dotnetapp.Services;
using dotnetapp.Models;
using Microsoft.AspNetCore.Authorization;

[Route("api/feed")]
[ApiController]
[Authorize]
public class FeedController : ControllerBase
{
    private readonly FeedService _feedService;

    public FeedController(FeedService feedService)
    {
        _feedService = feedService;
    }

    // Retrieves and returns all feeds
    [HttpGet]
    [Authorize(Roles = "Supplier,Owner")]
    public async Task<ActionResult<IEnumerable<Feed>>> GetAllFeeds()
    {
        try
        {
            var feeds = await _feedService.GetAllFeeds();
            return Ok(feeds);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // Retrieves a feed from the database with the specified feedId
    [HttpGet("{feedId}")]
    [Authorize(Roles = "Supplier,Owner")]
    public async Task<ActionResult<Feed>> GetFeedById(int feedId)
    {
        try
        {
            var feed = await _feedService.GetFeedById(feedId);
            if (feed == null)
            {
                return NotFound("Cannot find any feed");
            }
            return Ok(feed);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // Retrieves and returns all feeds with the specified userId
    [HttpGet("user/{userId}")]
    [Authorize(Roles = "Supplier,Owner")]
    public async Task<ActionResult<IEnumerable<Feed>>> GetFeedsByUserId(int userId)
    {
        try
        {
            var feeds = await _feedService.GetFeedsByUserId(userId);
            if (feeds == null || !feeds.Any())
            {
                return NotFound("No feeds found for this user");
            }
            return Ok(feeds);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // Adds a new feed to the database
    [HttpPost]
    [Authorize(Roles = "Supplier")]
    public async Task<ActionResult> AddFeed([FromBody] Feed feed)
    {
        try
        {
            var result = await _feedService.AddFeed(feed);
            if (result)
            {
                return Ok("Feed added successfully");
            }
            return StatusCode(500, "Failed to add feed");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // Updates an existing feed in the database
    [HttpPut("{feedId}")]
    [Authorize(Roles = "Supplier")]
    public async Task<ActionResult> UpdateFeed(int feedId, [FromBody] Feed feed)
    {
        try
        {
            var result = await _feedService.UpdateFeed(feedId, feed);
            if (result)
            {
                return Ok("Feed updated successfully");
            }
            return NotFound("Cannot find any feed");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    // Deletes a feed from the database
    [HttpDelete("{feedId}")]
    [Authorize(Roles = "Supplier")]
    public async Task<ActionResult> DeleteFeed(int feedId)
    {
        try
        {
            var result = await _feedService.DeleteFeed(feedId);
            if (result)
            {
                return Ok("Feed deleted successfully");
            }
            return NotFound("Cannot find any feed");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}