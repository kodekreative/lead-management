namespace LeadManagementAPI.Models;

public class Lead
{
    public int Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Phone { get; set; } = String.Empty;
    public string ZipCode { get; set; } = String.Empty;
    public bool PermissionToContact { get; set; }
    public string? Email { get; set; }
}
