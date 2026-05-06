import { CONFIG } from 'src/global-config';
import Dashboard from 'src/sections/OptimaDashboard/Dashboard';


// ----------------------------------------------------------------------

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <Dashboard />;
}
