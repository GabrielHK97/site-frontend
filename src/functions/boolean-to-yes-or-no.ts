enum YesOrNo {
	YES = 'yes',
	NO = 'no'
}

export function booleanToYesOrNo(bool: boolean): YesOrNo {
	return bool ? YesOrNo.YES : YesOrNo.NO;
}
