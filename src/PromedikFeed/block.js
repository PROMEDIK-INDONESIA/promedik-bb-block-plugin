/**
 * BLOCK: multi-block-2
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import { PromedikFeedEdit } from './edit'
import { PromedikFeedSave } from './save'

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('promedik/promedik-feed', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('ProMedik - Feeds', 'ProMedik'), // Block title.
	icon: 'menu', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('ProMedik - Feeds'),
		__('ProMedik'),
		__('Feeds'),
	],
	attributes: {
		avatar: { type: "string" },
		title: { type: "string" },
		actFeed: { type: "string" },
		link: { type: "string" },
		component: { type: "string" },
		type: { type: "string" },
		data: { type: "array" },
		isHideAvatar: { type: "boolean" }
	},

	edit: function (props) {
		return (
			<div className={props.className}>
				<PromedikFeedEdit props={props} />
			</div>
		);
	},

	save: function (props) {
		return (
			<div className={props.className}>
				<PromedikFeedSave props={props} />
			</div>
		);
	},
});