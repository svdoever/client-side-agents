import './style.css'
import { setupShowAgents } from './agents'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h3>Test app to show list of Azure AI Agent Service agents</h3>
    <div class="card">
      <button id="showAgentsButton" type="button">Show Agents</button>
    </div>
    <div class="card" id="showAgentsOutput">
    </div>
  </div>
`

setupShowAgents(
  document.querySelector<HTMLButtonElement>('#showAgentsButton')!,
  document.querySelector<HTMLDivElement>('#showAgentsOutput')!
);
