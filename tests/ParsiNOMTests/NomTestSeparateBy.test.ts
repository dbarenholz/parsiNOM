import { P } from '../../src/ParsiNOM';
import { P_UTILS } from '../../src/ParserUtils';

describe.each([
	['', true],
	['this', true],
	['this,this', true],
	['this,this,this', true],
	['this, this', false],
	['foo', false],
])(`separateBy '%s'`, (str, expected) => {
	const parser = P.separateBy(P.string('this'), P.string(',')).thenEof();
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