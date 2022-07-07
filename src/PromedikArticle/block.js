/**
 * BLOCK: promedik-plugin
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import { PromedikArticleEdit } from './edit'
import { PromedikArticleSave } from './save'

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('promedik/promedik-article', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('ProMedik - Article', 'ProMedik'), // Block title.
	icon: 'menu', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('ProMedik - Article'),
		__('ProMedik'),
		__('Article'),
	],
	attributes: {
		tags: { type: "array" },
		tagsWithDetail: { type: "array" },
		data: { type: "array" },
		masterData: { type: "array" },
		categories: { type: "array" },
		authors: { type: "array" },
		isNarrow: { type: "boolean" },
		articleShowNumber: { type: "integer" },
		filteredCategories: { type: "array" },
		filteredAuthors: { type: "array" }
	},

	edit: function (props) {
		return (
			<div className={props.className}>
				<PromedikArticleEdit props={props} />
			</div>
		);
	},

	save: function (props) {
		return (
			<div className={props.className}>
				<PromedikArticleSave props={props} />
			</div>
		);
	},
});