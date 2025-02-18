using LeadManagementAPI.Models;

namespace LeadManagementAPI.Services;

public class LeadService : ILeadService
{
    private readonly List<Lead> _leads = new List<Lead>();
    private int _nextId = 1;

    public IEnumerable<Lead> GetAllLeads()
    {
        return _leads;
    }

    public Lead? GetLeadById(int id)
    {
        return _leads.FirstOrDefault(lead => lead.Id == id);
    }

    public Lead AddLead(Lead lead)
    {
        lead.Id = _nextId++;
        _leads.Add(lead);
        return lead;
    }
}

