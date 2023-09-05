import { P } from '../../src/ParsiNOM';
import { P_UTILS } from '../../src/ParserUtils';

describe.each([
	['', false],
	['(this)', true],
	['this)', false],
	['(this', false],
	[')this(', false],
	['foo', false],
])(`wrap '%s'`, (str, expected) => {
	const parser = P.string('this').wrap(P.string('('), P.string(')')).thenEof();
	const result = parser.tryParse(str);

	test(`success to be ${expected}`, () => {
		expect(result.success).toBe(expected);
	});

	if (expected) {
		test(`AST to match snapshot`, () => {
			expect(result.value).toMatchSnapshot();
		});
	} else {
		test(`Error to match snapshot`, () => {
			expect({
				pos: result.furthest,
				expected: result.expected,
			}).toMatchSnapshot();
		});
	}
});
