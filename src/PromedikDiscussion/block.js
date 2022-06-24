/**
 * BLOCK: multi-block-2
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';
import { PromedikDiscussionEdit } from './edit'
import { PromedikDiscussionSave } from './save'

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
registerBlockType('promedik/promedik-discussion', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('ProMedik - Discussion', 'ProMedik'), // Block title.
	icon: 'menu', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('ProMedik - Discussion'),
		__('ProMedik'),
		__('Discussion'),
	],
	attributes: {
		// avatar: { type: "string" },
		// title: { type: "string" },
		// actFeed: { type: "string" },
		// link: { type: "string" },
		// component: { type: "string" },
		// type: { type: "string" },
		data: { type: "array" },
		isFertilitasHidden: { type: "boolean" },
		isLifestyleHidden: { type: "boolean" },
		isDermatologiHidden: { type: "boolean" },
		isHideAvatar: { type: "boolean" }
	},

	edit: function (props) {
		// console.log(props, '<<< props edit');
		return (
			<div className={props.className}>
				<PromedikDiscussionEdit props={props} />
			</div>
		);
	},

	save: function (props) {
		// console.log(props, '<<< props save');
		return (
			<div className={props.className}>
				<PromedikDiscussionSave props={props} />
			</div>
		);
	},
});