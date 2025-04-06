import { message } from 'antd';

export function handleError(error: unknown) {
  if (error instanceof Error) {
    message.error(error.message);
  } else {
    message.error('Something went wrong');
  }
}
