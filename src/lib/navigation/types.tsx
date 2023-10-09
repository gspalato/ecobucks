export type RootStackParamList = {
	Login: undefined;
	Main: undefined;
	Scan: undefined;
	Map: undefined;
	Settings: undefined;

	// Operator-only routes.
	Add: undefined;
	QRCode: { id: string; credits: number };
};

export type SettingsStackParamList = {
	Settings: undefined;
	ChangeCardStyle: undefined;
};
