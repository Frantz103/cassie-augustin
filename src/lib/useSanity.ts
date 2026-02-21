export function useSanity(): boolean {
	const enabledFlag = import.meta.env.PUBLIC_USE_SANITY;
	const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;

	// Allow quick rollback by setting PUBLIC_USE_SANITY=false
	if (enabledFlag && enabledFlag.toLowerCase() === 'false') {
		return false;
	}

	return Boolean(projectId);
}
