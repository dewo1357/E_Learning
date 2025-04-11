import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import './index.css'
import Auth from './HomeAPP/Auth.jsx'
import OptionsTopicPages from './OptionsTopicPages/index.jsx'
import ActionModule from './AddModule/index.jsx'
import ModulePages from './ModulePages/index.jsx'
import ModuleDetailPages from './ModuleDetail/index.jsx'
import ReadModule from './Module/index.jsx'
import Exercise from './Exercise/index.jsx'
import UserSettings from './SettingPages/Setting.jsx'
import AboutUs from './About/index.jsx'


const Router = createBrowserRouter([
  {
    path : "*",
    element : <><h1>NOT FOUND</h1></>
  },
  {
    path : "/AboutUs",
    element : <AboutUs/>
  },
  {
    path : "/StartExercise/:idModule",
    element : <Exercise learn={true}/>
  },
  {
    path : "/Exercise/:idModule",
    element : <Exercise learn={false}/>
  },
  {
    path : "/Settings",
    element : <UserSettings/>
  },
  {
    path : "/AddModule",
    element : <ActionModule AddSubModule={false} Setting={false} SettingSub={false}/>
  },
  {
    path : "/ReadModule/:idModule/:idSubModule",
    element : <ReadModule/>
  },
  {
    path : "/SettingSubModule/:idModule/:idSubModule",
    element : <ActionModule AddSubModul={false} Setting={true} SettingSub={true}/>
  },
  {
    path : "/SettingModule/:idModule",
    element : <ActionModule AddSubModul={false} Setting={true} SettingSub={false}/>
  },
  {
    path : "/AddSubModule/:idModule",
    element : <ActionModule Setting={false} AddSubModule={true} SettingSub={false}/>
  },
  //
  {
    path : "/MyPlaylistModule/:user",
    element : <ModulePages  learn={true}/>
  },
  {
    path : "/ModulePages/:user",
    element : <ModulePages learn={false}/>
  },
  {
    path : "/TopicLesson/:idModule",
    element : <ModuleDetailPages learn={true}/>
  },
  {
    path : "/ModuleDetail/:idModule",
    element : <ModuleDetailPages learn={false}/>
  },
  {
    path : "/Topics",
    element : <OptionsTopicPages/>
  },
  {
    path : "/",
    element : <Auth login={false}/>
  },
  {
    path : "/login",
    element : <Auth login={true}/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>,
)
