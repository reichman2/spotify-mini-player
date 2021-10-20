import { Button } from './components/Button';
import Controls from './components/Controls';

import { authorize } from './oauth/auth';

import './styles/main.scss';


export function App() {
  

  return (
    <>
      <Controls />
      <Button onClick={ () => authorize() }>Authorize</Button>
    </>
  );
}