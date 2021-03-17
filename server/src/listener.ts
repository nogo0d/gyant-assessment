import { InjectAppInput } from './types';

export default ({ app }: InjectAppInput, port: string) => {
	app.listen(port, () => console.log(`Application started successfully on port ${port}.`));
};
