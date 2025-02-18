using LeadManagementAPI.Models;

namespace LeadManagementAPI.Services;

public interface ILeadService
{
    IEnumerable<Lead> GetAllLeads();

    Lead? GetLeadById(int id);

    Lead AddLead(Lead lead);
}
