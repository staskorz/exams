export default {
	exams: 'מבחנים',
	home: 'ראשי',
	createExam: 'צור מבחן',
	listExams: 'רשימת מבחנים',
	chooseExam: 'בחר מבחן',
	page1: 'עמוד ראשון',
	examName: 'שם מבחן',
	published: 'פורסם',
	actions: 'פעולות',
	takeExam: 'גש למבחן',
	numberOfQuestions: 'משפר שאלות',
	start: 'התחל',
	cancel: 'בטל',
	questionNumberXofY: 'שאלה מספר { number } מתוך { of }',
	multipleCorrectAnswersAvailable: '* יש יותר מתשובה אחת נכונה',
	previous: 'חזור',
	next: 'הבא',
	finish: 'סיים',
	areYouSure: 'האם אתה בטוח?',
	yes: 'כן',
	no: 'לא',
	editExam: 'ערוך מבחן',
	save: 'שמור',
	weight: 'משקל',
	questionBody: 'גוף השאלה',
	answer: 'תשובה { number }',
	add: 'הוסף',
	remove: 'הסר',
	retryingInX: 'מנסה שוב בעוד { seconds } שניות',
	disconnected: 'מנותק',
	reconnectNow: 'התחבר עכשיו'
};


export const SimpleSchemaMessages = {
	required: 'שדה חובה',
	minString: 'יש להזין לפחות [min] תוים',
	maxString: 'יש להזין לא יותר מ- [max] תוים',
	minNumber: 'מינימום [min]',
	maxNumber: 'לא יותר מ- [max]',
	minDate: 'לא לפני [min]',
	maxDate: 'לא אחרי [max]',
	badDate: 'תאריך לא תקין',
	minCount: 'יש להזין [minCount] ערכים לפחות',
	maxCount: 'יש להזין לא יותר מ- [maxCount] ערכים',
	noDecimal: 'מספר שלם בלבד',
	notAllowed: 'ערך לא מאושר',
	expectedString: 'מחרוזת תוים בלבד',
	expectedNumber: 'מספר בלבד',
	expectedBoolean: 'ערך בוליאני בלבד',
	expectedArray: 'מערך בלבד',
	expectedObject: 'אובייקט בלבד',
	expectedConstructor: 'מסוג [type] בלבד',
	regEx: [
		{ msg: 'ערך לא חוקי' },
		{ exp: SimpleSchema.RegEx.Email, msg: 'כתובת דואר אלקטרוני בלבד' },
		{ exp: SimpleSchema.RegEx.WeakEmail, msg: 'כתובת דואר אלקטרוני בלבד' },
		{ exp: SimpleSchema.RegEx.Domain, msg: 'דומיין בלבד' },
		{ exp: SimpleSchema.RegEx.WeakDomain, msg: 'דומיין בלבד' },
		{ exp: SimpleSchema.RegEx.IP, msg: 'כתובת IP מגרסה 4 או 6 בלבד' },
		{ exp: SimpleSchema.RegEx.IPv4, msg: 'כתובת IP מגרסה 4 בלבד' },
		{ exp: SimpleSchema.RegEx.IPv6, msg: 'כתובת IP מגרסה 6 בלבד' },
		{ exp: SimpleSchema.RegEx.Url, msg: 'URL בלבד' },
		{ exp: SimpleSchema.RegEx.Id, msg: 'ID אלפאנומרי בלבד' }
	],
	keyNotInSchema: '[key] לא מאושר בסכמה'
};
