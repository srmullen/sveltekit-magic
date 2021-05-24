import { Magic } from '@magic-sdk/admin';
import { MAGIC_SECRET_KEY } from '$lib/config';

export const magic = new Magic(MAGIC_SECRET_KEY);
