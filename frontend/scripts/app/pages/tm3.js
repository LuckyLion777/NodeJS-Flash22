/* global $, utilsInstance, loadAssets */

const requireAssets = [
  'https://cdn.jsdelivr.net/g/jquery@3.1.1,js-cookie@2.2.0,tether@1.3.7,bootstrap@4.0.0-alpha.5,jquery.mask@1.14.10,mailcheck@1.1,mobile-detect.js@1.3.5',
  '/tacticalsales/assets/js/libs.js',
];

const tm3 = () => {
  const init = () => {
    $('.popupButton').click((e) => {
      const data = $(e.currentTarget).data();
      utilsInstance.showModal(data.modalid);
    });
  };

  init();
};

loadAssets(requireAssets, {
  success: () => tm3(),
  async: false,
});
