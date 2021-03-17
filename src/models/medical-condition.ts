export type IC10 =
	| 'A09'
	| 'A64'
	| 'B300'
	| 'B302'
	| 'B308'
	| 'B309'
	| 'B373'
	| 'B9789'
	| 'E860'
	| 'F340'
	| 'F341'
	| 'F39'
	| 'F411'
	| 'F418'
	| 'F419'
	| 'F4321'
	| 'G43001'
	| 'G43009'
	| 'G43019'
	| 'G43501'
	| 'G43509'
	| 'G43519'
	| 'G43701'
	| 'G43709'
	| 'G43711'
	| 'G43719'
	| 'G43809'
	| 'G43811'
	| 'G43819'
	| 'G43829'
	| 'G43909'
	| 'G43911'
	| 'G43919'
	| 'G44209'
	| 'G44219'
	| 'G4700'
	| 'G4701'
	| 'G5600'
	| 'H10029'
	| 'H1033'
	| 'H1044'
	| 'H1045'
	| 'H10509'
	| 'H10819'
	| 'H1089'
	| 'H109'
	| 'H6020'
	| 'H60339'
	| 'H60399'
	| 'H6500'
	| 'H65119'
	| 'H65199'
	| 'H6520'
	| 'H65499'
	| 'H6590'
	| 'H66009'
	| 'H66019'
	| 'H663X9'
	| 'H6640'
	| 'H6690'
	| 'J00'
	| 'J0100'
	| 'J0110'
	| 'J0130'
	| 'J0140'
	| 'J0190'
	| 'J029'
	| 'J060'
	| 'J069'
	| 'J209'
	| 'J301'
	| 'J3081'
	| 'J36'
	| 'J40'
	| 'J411'
	| 'J42'
	| 'J45901'
	| 'J45902'
	| 'K210'
	| 'K219'
	| 'K2900'
	| 'K2920'
	| 'K2960'
	| 'K5900'
	| 'K5901'
	| 'K5902'
	| 'K649'
	| 'K8019'
	| 'K8020'
	| 'K8021'
	| 'K8042'
	| 'K8050'
	| 'K8051'
	| 'L240'
	| 'L242'
	| 'L250'
	| 'L251'
	| 'L253'
	| 'L255'
	| 'L259'
	| 'M25539'
	| 'M5430'
	| 'N730'
	| 'N733'
	| 'N739'
	| 'N912'
	| 'N920'
	| 'N921'
	| 'N924'
	| 'N930'
	| 'N946'
	| 'R079'
	| 'R109'
	| 'R21'
	| 'R42'
	| 'S53449A'
	| 'S63519A'
	| 'S63599A'
	| 'S638X9A'
	| 'S93419A'
	| 'S93429A'
	| 'S93439A';

export type MedicalCondition = {
	id: IC10;
	description: string;
};

export const MEDICAL_CONDITION_LIST: Record<IC10, MedicalCondition> = {
	A09: {
		id: 'A09',
		description: 'Infectious gastroenteritis and colitis, unspecified',
	},
	A64: {
		id: 'A64',
		description: 'Unspecified sexually transmitted disease',
	},
	B300: {
		id: 'B300',
		description: 'Keratoconjunctivitis due to adenovirus',
	},
	B302: {
		id: 'B302',
		description: 'Viral pharyngoconjunctivitis',
	},
	B308: {
		id: 'B308',
		description: 'Other viral conjunctivitis',
	},
	B309: {
		id: 'B309',
		description: 'Viral conjunctivitis, unspecified',
	},
	B373: {
		id: 'B373',
		description: 'Candidiasis of vulva and vagina',
	},
	B9789: {
		id: 'B9789',
		description: 'Other viral agents as the cause of diseases classified elsewhere',
	},
	E860: {
		id: 'E860',
		description: 'Dehydration',
	},
	F340: {
		id: 'F340',
		description: 'Cyclothymic disorder',
	},
	F341: {
		id: 'F341',
		description: 'Dysthymic disorder',
	},
	F39: {
		id: 'F39',
		description: 'Unspecified mood [affective] disorder',
	},
	F411: {
		id: 'F411',
		description: 'Generalized anxiety disorder',
	},
	F418: {
		id: 'F418',
		description: 'Other specified anxiety disorders',
	},
	F419: {
		id: 'F419',
		description: 'Anxiety disorder, unspecified',
	},
	F4321: {
		id: 'F4321',
		description: 'Adjustment disorder with depressed mood',
	},
	G43001: {
		id: 'G43001',
		description: 'Migraine without aura, not intractable, with status migrainosus',
	},
	G43009: {
		id: 'G43009',
		description: 'Migraine without aura, not intractable, without status migrainosus',
	},
	G43019: {
		id: 'G43019',
		description: 'Migraine without aura, intractable, without status migrainosus',
	},
	G43501: {
		id: 'G43501',
		description: 'Persistent migraine aura without cerebral infarction, not intractable, with status migrainosus',
	},
	G43509: {
		id: 'G43509',
		description:
			'Persistent migraine aura without cerebral infarction, not intractable, without status migrainosus',
	},
	G43519: {
		id: 'G43519',
		description: 'Persistent migraine aura without cerebral infarction, intractable, without status migrainosus',
	},
	G43701: {
		id: 'G43701',
		description: 'Chronic migraine without aura, not intractable, with status migrainosus',
	},
	G43709: {
		id: 'G43709',
		description: 'Chronic migraine without aura, not intractable, without status migrainosus',
	},
	G43711: {
		id: 'G43711',
		description: 'Chronic migraine without aura, intractable, with status migrainosus',
	},
	G43719: {
		id: 'G43719',
		description: 'Chronic migraine without aura, intractable, without status migrainosus',
	},
	G43809: {
		id: 'G43809',
		description: 'Other migraine, not intractable, without status migrainosus',
	},
	G43811: {
		id: 'G43811',
		description: 'Other migraine, intractable, with status migrainosus',
	},
	G43819: {
		id: 'G43819',
		description: 'Other migraine, intractable, without status migrainosus',
	},
	G43829: {
		id: 'G43829',
		description: 'Menstrual migraine, not intractable, without status migrainosus',
	},
	G43909: {
		id: 'G43909',
		description: 'Migraine, unspecified, not intractable, without status migrainosus',
	},
	G43911: {
		id: 'G43911',
		description: 'Migraine, unspecified, intractable, with status migrainosus',
	},
	G43919: {
		id: 'G43919',
		description: 'Migraine, unspecified, intractable, without status migrainosus',
	},
	G44209: {
		id: 'G44209',
		description: 'Tension-type headache, unspecified, not intractable',
	},
	G44219: {
		id: 'G44219',
		description: 'Episodic tension-type headache, not intractable',
	},
	G4700: {
		id: 'G4700',
		description: 'Insomnia, unspecified',
	},
	G4701: {
		id: 'G4701',
		description: 'Insomnia due to medical condition',
	},
	G5600: {
		id: 'G5600',
		description: 'Carpal tunnel syndrome, unspecified upper limb',
	},
	H10029: {
		id: 'H10029',
		description: 'Other mucopurulent conjunctivitis, unspecified eye',
	},
	H1033: {
		id: 'H1033',
		description: 'Unspecified acute conjunctivitis, bilateral',
	},
	H1044: {
		id: 'H1044',
		description: 'Vernal conjunctivitis',
	},
	H1045: {
		id: 'H1045',
		description: 'Other chronic allergic conjunctivitis',
	},
	H10509: {
		id: 'H10509',
		description: 'Unspecified blepharoconjunctivitis, unspecified eye',
	},
	H10819: {
		id: 'H10819',
		description: 'Pingueculitis, unspecified eye',
	},
	H1089: {
		id: 'H1089',
		description: 'Other conjunctivitis',
	},
	H109: {
		id: 'H109',
		description: 'Unspecified conjunctivitis',
	},
	H6020: {
		id: 'H6020',
		description: 'Malignant otitis externa, unspecified ear',
	},
	H60339: {
		id: 'H60339',
		description: `Swimmer's ear, unspecified ear`,
	},
	H60399: {
		id: 'H60399',
		description: 'Other infective otitis externa, unspecified ear',
	},
	H6500: {
		id: 'H6500',
		description: 'Acute serous otitis media, unspecified ear',
	},
	H65119: {
		id: 'H65119',
		description: 'Acute and subacute allergic otitis media (mucoid) (sanguinous) (serous), unspecified ear',
	},
	H65199: {
		id: 'H65199',
		description: 'Other acute nonsuppurative otitis media, unspecified ear',
	},
	H6520: {
		id: 'H6520',
		description: 'Chronic serous otitis media, unspecified ear',
	},
	H65499: {
		id: 'H65499',
		description: 'Other chronic nonsuppurative otitis media, unspecified ear',
	},
	H6590: {
		id: 'H6590',
		description: 'Unspecified nonsuppurative otitis media, unspecified ear',
	},
	H66009: {
		id: 'H66009',
		description: 'Acute suppurative otitis media without spontaneous rupture of ear drum, unspecified ear',
	},
	H66019: {
		id: 'H66019',
		description: 'Acute suppurative otitis media with spontaneous rupture of ear drum, unspecified ear',
	},
	H663X9: {
		id: 'H663X9',
		description: 'Other chronic suppurative otitis media, unspecified ear',
	},
	H6640: {
		id: 'H6640',
		description: 'Suppurative otitis media, unspecified, unspecified ear',
	},
	H6690: {
		id: 'H6690',
		description: 'Otitis media, unspecified, unspecified ear',
	},
	J00: {
		id: 'J00',
		description: 'Acute nasopharyngitis [common cold]',
	},
	J0100: {
		id: 'J0100',
		description: 'Acute maxillary sinusitis, unspecified',
	},
	J0110: {
		id: 'J0110',
		description: 'Acute frontal sinusitis, unspecified',
	},
	J0130: {
		id: 'J0130',
		description: 'Acute sphenoidal sinusitis, unspecified',
	},
	J0140: {
		id: 'J0140',
		description: 'Acute pansinusitis, unspecified',
	},
	J0190: {
		id: 'J0190',
		description: 'Acute sinusitis, unspecified',
	},
	J029: {
		id: 'J029',
		description: 'Acute pharyngitis, unspecified',
	},
	J060: {
		id: 'J060',
		description: 'Acute laryngopharyngitis',
	},
	J069: {
		id: 'J069',
		description: 'Acute upper respiratory infection, unspecified',
	},
	J209: {
		id: 'J209',
		description: 'Acute bronchitis, unspecified',
	},
	J301: {
		id: 'J301',
		description: 'Allergic rhinitis due to pollen',
	},
	J3081: {
		id: 'J3081',
		description: 'Allergic rhinitis due to animal (cat) (dog) hair and dander',
	},
	J36: {
		id: 'J36',
		description: 'Peritonsillar abscess',
	},
	J40: {
		id: 'J40',
		description: 'Bronchitis, not specified as acute or chronic',
	},
	J411: {
		id: 'J411',
		description: 'Mucopurulent chronic bronchitis',
	},
	J42: {
		id: 'J42',
		description: 'Unspecified chronic bronchitis',
	},
	J45901: {
		id: 'J45901',
		description: 'Unspecified asthma with (acute) exacerbation',
	},
	J45902: {
		id: 'J45902',
		description: 'Unspecified asthma with status asthmaticus',
	},
	K210: {
		id: 'K210',
		description: 'Gastro-esophageal reflux disease with esophagitis',
	},
	K219: {
		id: 'K219',
		description: 'Gastro-esophageal reflux disease without esophagitis',
	},
	K2900: {
		id: 'K2900',
		description: 'Acute gastritis without bleeding',
	},
	K2920: {
		id: 'K2920',
		description: 'Alcoholic gastritis without bleeding',
	},
	K2960: {
		id: 'K2960',
		description: 'Other gastritis without bleeding',
	},
	K5900: {
		id: 'K5900',
		description: 'Constipation, unspecified',
	},
	K5901: {
		id: 'K5901',
		description: 'Slow transit constipation',
	},
	K5902: {
		id: 'K5902',
		description: 'Outlet dysfunction constipation',
	},
	K649: {
		id: 'K649',
		description: 'Unspecified hemorrhoids',
	},
	K8019: {
		id: 'K8019',
		description: 'Calculus of gallbladder with other cholecystitis with obstruction',
	},
	K8020: {
		id: 'K8020',
		description: 'Calculus of gallbladder without cholecystitis without obstruction',
	},
	K8021: {
		id: 'K8021',
		description: 'Calculus of gallbladder without cholecystitis with obstruction',
	},
	K8042: {
		id: 'K8042',
		description: 'Calculus of bile duct with acute cholecystitis without obstruction',
	},
	K8050: {
		id: 'K8050',
		description: 'Calculus of bile duct without cholangitis or cholecystitis without obstruction',
	},
	K8051: {
		id: 'K8051',
		description: 'Calculus of bile duct without cholangitis or cholecystitis with obstruction',
	},
	L240: {
		id: 'L240',
		description: 'Irritant contact dermatitis due to detergents',
	},
	L242: {
		id: 'L242',
		description: 'Irritant contact dermatitis due to solvents',
	},
	L250: {
		id: 'L250',
		description: 'Unspecified contact dermatitis due to cosmetics',
	},
	L251: {
		id: 'L251',
		description: 'Unspecified contact dermatitis due to drugs in contact with skin',
	},
	L253: {
		id: 'L253',
		description: 'Unspecified contact dermatitis due to other chemical products',
	},
	L255: {
		id: 'L255',
		description: 'Unspecified contact dermatitis due to plants, except food',
	},
	L259: {
		id: 'L259',
		description: 'Unspecified contact dermatitis, unspecified cause',
	},
	M25539: {
		id: 'M25539',
		description: 'Pain in unspecified wrist',
	},
	M5430: {
		id: 'M5430',
		description: 'Sciatica, unspecified side',
	},
	N730: {
		id: 'N730',
		description: 'Acute parametritis and pelvic cellulitis',
	},
	N733: {
		id: 'N733',
		description: 'Female acute pelvic peritonitis',
	},
	N739: {
		id: 'N739',
		description: 'Female pelvic inflammatory disease, unspecified',
	},
	N912: {
		id: 'N912',
		description: 'Amenorrhea, unspecified',
	},
	N920: {
		id: 'N920',
		description: 'Excessive and frequent menstruation with regular cycle',
	},
	N921: {
		id: 'N921',
		description: 'Excessive and frequent menstruation with irregular cycle',
	},
	N924: {
		id: 'N924',
		description: 'Excessive bleeding in the premenopausal period',
	},
	N930: {
		id: 'N930',
		description: 'Postcoital and contact bleeding',
	},
	N946: {
		id: 'N946',
		description: 'Dysmenorrhea, unspecified',
	},
	R079: {
		id: 'R079',
		description: 'Chest pain, unspecified',
	},
	R109: {
		id: 'R109',
		description: 'Unspecified abdominal pain',
	},
	R21: {
		id: 'R21',
		description: 'Rash and other nonspecific skin eruption',
	},
	R42: {
		id: 'R42',
		description: 'Dizziness and giddiness',
	},
	S53449A: {
		id: 'S53449A',
		description: 'Ulnar collateral ligament sprain of unspecified elbow, initial encounter',
	},
	S63519A: {
		id: 'S63519A',
		description: 'Sprain of carpal joint of unspecified wrist, initial encounter',
	},
	S63599A: {
		id: 'S63599A',
		description: 'Other specified sprain of unspecified wrist, initial encounter',
	},
	S638X9A: {
		id: 'S638X9A',
		description: 'Sprain of other part of unspecified wrist and hand, initial encounter',
	},
	S93419A: {
		id: 'S93419A',
		description: 'Sprain of calcaneofibular ligament of unspecified ankle, initial encounter',
	},
	S93429A: {
		id: 'S93429A',
		description: 'Sprain of deltoid ligament of unspecified ankle, initial encounter',
	},
	S93439A: {
		id: 'S93439A',
		description: 'Sprain of tibiofibular ligament of unspecified ankle, initial encounter',
	},
};
