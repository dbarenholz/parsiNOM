import { Parser } from './Parser';
import { ParserContext } from './ParserContext';

export type STypeBase = any;

export interface ParseSuccess<SType extends STypeBase> {
	success: true;
	value: SType;
	furthest: ParsingPosition | undefined;
	expected: string[] | undefined;
}

export interface ParseFailure {
	success: false;
	value: undefined;
	furthest: ParsingPosition;
	expected: string[];
}

export type ParseResult<SType extends STypeBase> = ParseSuccess<SType> | ParseFailure;

export type ParseFunction<SType extends STypeBase> = (context: ParserContext) => ParseResult<SType>;

export interface ParsingPosition {
	index: number;
	line: number;
	column: number;
}

export interface ParsingRange {
	from: ParsingPosition;
	to: ParsingPosition;
}

export interface ParsingMarker<SType extends STypeBase> {
	value: SType;
	range: ParsingRange;
}

export interface NamedParsingMarker<SType extends STypeBase> {
	value: SType;
	name: string;
	range: ParsingRange;
}

export type LanguageDef<RuleNames extends object> = {
	[P in keyof RuleNames]: Parser<RuleNames[P]>;
};

export type LanguageRules<RuleNames extends object> = {
	[P in keyof RuleNames]: (language: LanguageDef<RuleNames>) => Parser<RuleNames[P]>;
};

/**
 * All parsers of a language. Returned by {@link P.createLanguage}.
 */
export type NomLanguage<RulesType extends object> = {
	[P in keyof RulesType]: Parser<RulesType[P]>;
};

/**
 * All parsers of a language. Returned by {@link P.createLanguage}.
 */
export type NomLanguageRules<RulesType extends object> = {
	readonly [P in keyof RulesType]: (language: NomLanguagePartial<RulesType>, ref: NomLanguageRef<RulesType>) => Parser<RulesType[P]>;
};

/**
 * All parsers of a language wrapped in {@link P.reference}.
 */
export type NomLanguageRef<RulesType extends object> = {
	[P in keyof RulesType]: ParserRef<RulesType[P]>;
};

/**
 * Parsers of a language that came before this parser. All other parsers will be undefined.
 */
export type NomLanguagePartial<RulesType extends object> = {
	[P in keyof RulesType]: Parser<RulesType[P]>;
};

export type ParserRef<SType extends STypeBase> = Parser<SType>;

export type TupleToUnion<T extends readonly unknown[]> = T[number];

export type DeParser<T extends Parser<unknown>> = T extends Parser<infer U> ? U : never;

export type DeParserArray<T extends readonly Parser<unknown>[]> = {
	[I in keyof T]: T[I] extends Parser<infer R> ? R : never;
};
