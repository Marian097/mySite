import AuthPage from "./page/AuthPage.tsx";
import useAuthForm from "./hooks/useAuthForm.ts";
import useCharts from "./hooks/useCharts.ts";
import AdminPanel from "./page/AdminPanel.tsx";
import hooksWorker from "./hooks/useWorkers.ts";
import hooksIdentity from "./hooks/useIdentityForm.ts";
import hooksBussiness from "./hooks/useBussinesForm.ts";
import { Routes, Route } from "react-router";
import AccountSetup from "./page/AccountSetup.tsx";

function App() {
  const render = useAuthForm();
  const workers = hooksWorker();
  const charts = useCharts();
  const identity = hooksIdentity();
  const bussiness = hooksBussiness();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <AuthPage
              setIsLoggedForm={render.setIsLoggedForm}
              message={render.message}
              value={render.values}
              errors={render.errors}
              touched={render.touched}
              isLoggedForm={render.isLoggedForm}
              handleChange={render.handleChange}
              handleBlur={render.handleBlur}
              singUpProvider={render.signUpProvider}
              errorsLogin={render.errorsLogin}
              login = {render.login}
            />
          }
        />{" "}
        <Route
          path="/verificare-informații/*"
          element={
            <AccountSetup
              values={identity.values}
              errors={identity.errors}
              touched={identity.touched}
              counties = {bussiness.counties}
              getCounties= {bussiness.getCounties}
              updateStep = {render.updateStep}
              handleChange={identity.handleChange}
              handleBlur={identity.handleBlur}
              handleSubmitIdentity={identity.handleSubmitIdentity}
              response={identity.response}
              isSteps={render.isSteps}
              setIsSteps={render.setIsSteps}
              valuesBussiness={bussiness.values}
              errorsBussiness={bussiness.error}
              touchedBussiness={bussiness.touched}
              handleChangeBussiness={bussiness.handleChange}
              handleBlurBussiness={bussiness.handleBlur}
              handleSubmitFiscalData={bussiness.handleSubmitFiscalData}
            />
          }
        />
        <Route
          path="/panou-administrare"
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
