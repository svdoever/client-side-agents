import { AgentsClient, type Agent, type PagedAsyncIterableIterator } from "@azure/ai-agents";
import { endpoint, clientId, tenantId } from "./settings";
import { InteractiveBrowserCredential, type InteractiveBrowserCredentialInBrowserOptions } from "@azure/identity";
// import { AIProjectClient } from "@azure/ai-projects";
export function setupShowAgents(button: HTMLButtonElement, outputElement: HTMLDivElement) {
  const showAgents = async (outputElement: HTMLDivElement) => {
    try {
      const options: InteractiveBrowserCredentialInBrowserOptions = {
        clientId,
        authorityHost: `https://login.microsoftonline.com/${tenantId}`,
        redirectUri: window.location.origin + "/aiproject-auth-callback.html",
      };

      // Create new agent client and cache it
      const credential = new InteractiveBrowserCredential(options);
      // const projectClient = AIProjectClient.fromEndpoint(endpoint, credential, {});

      // const agentsClient = projectClient.agents;
      const agentsClient: AgentsClient = new AgentsClient(endpoint, credential, {});  
      
      const listOfAgentsInterator: PagedAsyncIterableIterator<Agent> = agentsClient.listAgents({ limit: 100, order: "asc" });
      const listOfAgents: Agent[] = (await listOfAgentsInterator.byPage().next()).value;
      if (!listOfAgents || listOfAgents.length === 0) {
        outputElement.innerHTML = "<p>No agents found.</p>";
        return;
      }
      const agentNames: string[] = listOfAgents.map((agent) => agent.name || "Unnamed Agent");
      const agentNamesHtmlString = agentNames.map((name) => `<li>${name}</li>`).join("");
      outputElement.innerHTML = `<h4>Agents:</h4><ul>${agentNamesHtmlString}</ul>`;
    } catch (error) {
      console.error("Error fetching agents:", error);
      outputElement.innerHTML = `<pre>Error fetching agents: ${error instanceof Error ? error.message : error}</pre>`;
    }
  };
  button.addEventListener("click", () => showAgents(outputElement));
}
