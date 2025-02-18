using LeadManagementAPI.Models;
using LeadManagementAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace LeadManagementAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    private readonly ILeadService _leadService;

    public LeadsController(ILeadService leadService)
    {
        _leadService = leadService;
    }

    // GET: api/leads
    [HttpGet]
    public IActionResult GetAllLeads()
    {
        var leads = _leadService.GetAllLeads();
        return Ok(leads);
    }

    // GET: api/leads/{id}
    [HttpGet("{id}")]
    public IActionResult GetLeadById(int id)
    {
        var lead = _leadService.GetLeadById(id);
        if (lead == null)
        {
            return NotFound();
        }
        return Ok(lead);
    }

    // POST: api/leads
    [HttpPost]
    public IActionResult CreateLead([FromBody] Lead lead)
    {
        if (!ModelState.IsValid || string.IsNullOrEmpty(lead.Name) || string.IsNullOrEmpty(lead.Phone) || string.IsNullOrEmpty(lead.ZipCode))
        {
            return BadRequest("Invalid input. Name, Phone, and ZipCode are required.");
        }

        var newLead = _leadService.AddLead(lead);
        return CreatedAtAction(nameof(GetLeadById), new { id = newLead.Id }, newLead);
    }
}
