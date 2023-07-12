import { Layout } from '@components/Layout';
import { useCreateNight } from '@packages/nights/hooks';
import { CreateNightForm } from '../../screens/CreateNight/CreateNightForm';

const CreateNight = () => (
  <Layout>
    <CreateNightForm />
  </Layout>
);

export default CreateNight;
