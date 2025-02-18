import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCommonModule } from '@angular/material/core'; // ✅ Add Material module
import { LeadListComponent } from './components/lead-list/lead-list.component';
import { CreateLeadComponent } from './components/create-lead/create-lead.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LeadListComponent, CreateLeadComponent, MatCommonModule], // ✅ Ensure Material module is imported
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LeadManagementDashboard';
}
