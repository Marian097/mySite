import Sing_up from "./page/Sing_up";
import useAuthForm from "./hooks/useAuthForm.ts";
import useCharts from "./hooks/useCharts.ts";
import AdminPanel from "./page/AdminPanel.tsx";
import hooksWorker from "./hooks/useWorkers.ts";
import { Routes, Route } from "react-router";
// import ExplorePage from "./page/ExplorePage.tsx";

function App() {
  const render = useAuthForm();
  const workers = hooksWorker();
  const charts = useCharts();
  return (
    <>
      <Routes>
        <Route
          path="/*"
          element={
            <Sing_up
              message={render.message}
              value={render.values}
              errors={render.errors}
              touched={render.touched}
              handleChange={render.handleChange}
              handleBlur={render.handleBlur}
              singUp={render.signUp}
              login={render.login}
              isLoggedForm={render.isLoggedForm}
              setIsLoggedForm={render.setIsLoggedForm}
              errorsLogin={render.errorsLogin}
            />
          }
        />

        <Route
          path="/admin"
          element={
            <AdminPanel
              error={workers.error}
              workers={workers.workers}
              getWorkers={workers.getWorkers}
              getWorkersPending={workers.getWorkersPending}
              getWorkersRejected={workers.getWorkersRejected}
              getWorkersApprove={workers.getWorkersApproved}
              getWorkersByEmail={workers.getWorkersByEmail}
              getWorkerByCI_expiring={workers.getWorkerByCI_expiring}
              email={workers.email}
              setEmail={workers.setEmail}
              setIsStatus={workers.setIsStatus}
              admin={render.admin}
              countWorkers={workers.countWorkers}
              totalWorkers={workers.totalWorkers ?? 0}
              procent={workers.procent ?? 0}
              calculateProcent={workers.calculateProcent}
              procentApproved={workers.procentApproved ?? 0}
              approvedWorkers={workers.approvedWorkers ?? 0}
              calculateProcentApproved={workers.calculateProcentApproved}
              countWorkersApproved={workers.countWorkersApproved}
              rejectedWorkers={workers.rejectedWorkers ?? 0}
              procentRejected={workers.procentRejected ?? 0}
              countWorkersRejected={workers.countWorkersRejected}
              calculateProcentRejected={workers.calculateProcentRejected}
              pendingdWorkers={workers.pendingdWorkers ?? 0}
              procentPending={workers.procentPending ?? 0}
              countWorkersPending={workers.countWorkersPending}
              calculateProcentPending={workers.calculateProcentPending}
              data={charts.data}
              errCharts={charts.error}
              getStats={charts.getStats}
              handleAcceptUser={workers.handleAcceptUser}
              handleRejectUser={workers.handleRejectUser}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
