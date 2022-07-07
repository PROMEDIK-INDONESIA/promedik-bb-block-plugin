import moment from "moment"

export const PromedikGrey = '#DCDCDC'
export const PromedikGreyActFeedBox = '#FBFBFC'
export const PromedikLightGrey = '#f5f5f5'
export const PromedikDarkGrey = '#808080'
export const PromedikGreyBackgroundScreen = '#fafafa'
export const PromedikGreyIconBottomTab = '#A5A5A5'
export const PromedikGreyBorderFeedContent = '#d6d9dd'
export const PromedikGreyNewPostBG = '#f2f4f5'

export const PromedikStatusBlue = '#385DFF'
export const PromedikStatusGreen = '#14B550'
export const PromedikStatusOrange = '#ED9615'
export const PromedikStatusRed = '#DB222A'

export const PromedikForumCategoryFertilitas = '#A5C8C2'
export const PromedikForumCategoryLifestyle = '#A4D1E1'
export const PromedikForumCategoryDermatologi = '#95E1A1'

export const PromedikGreen = '#45959B'
export const PromedikLightGreen = '#E0EDEE'

export const PromedikOrange = '#F2844C'
export const PromedikLightOrange = '#F8C2A6'
export const PromedikUltraLightOrange = '#FFF7E1'

export const PromedikRed = '#EF3737'

export const PromedikWhite = '#FFFFFF'

export const PromedikYellow = '#F2C44C'

export const PromedikErrorRedText = '#FF8484'
export const PromedikErrorRed = '#ffbaba'
export const PromedikErrorRedBG = '#FFEEEE'

export const DateConverter = (date) => {
  const ReformatDate = moment(date).format("YYYY-MM-DD[T]HH:mm:ss")
  const LastActiveDiscussion = moment(ReformatDate).fromNow()
  return LastActiveDiscussion
}

export const DateConverterClassic = (date) => {
  const ReformatDate = moment(date).format('DD MMMM, YYYY')
  return ReformatDate
}

export const LetterCapitalizer = (text) => {
  return text[0].toUpperCase() + text.slice(1).toLowerCase()
}