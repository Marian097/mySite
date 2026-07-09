import Sing_up from "./page/sign_up.tsx";
import useAuthForm from "./hooks/useAuthForm.ts";
// import useCharts from "./hooks/useCharts.ts";
// import AdminPanel from "./page/admin_panel.tsx";
// import hooksWorker from "./hooks/useWorkers.ts";
import hooksIdentity from "./hooks/useIdentityForm.ts"
import { Routes, Route } from "react-router";
import VerifyIdentity from "./page/verify_identity.tsx";


function App() {
  const render = useAuthForm();
  // const workers = hooksWorker();
  // const charts = useCharts();
  const identity = hooksIdentity();
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
              singUpProvider={render.signUpProvider}
              loginProvider={render.loginProvider}
              isLoggedForm={render.isLoggedForm}
              setIsLoggedForm={render.setIsLoggedForm}
              errorsLogin={render.errorsLogin}
            />
          }
        />

        {/* <Route
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
        /> */}
        <Route
          path="/identity-verification"
          element={
            <VerifyIdentity
              values={identity.values}
              errors={identity.errors}
              touched={identity.touched}
              handleChange={identity.handleChange}
              handleBlur={identity.handleBlur}
              handleSubmitIdentity = {identity.handleSubmitIdentity}
              message = {identity.message}
              isSteps = {identity.isSteps}
              setIsSteps = {identity.setIsSteps}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
