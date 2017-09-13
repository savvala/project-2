$(() => {
  const $newFoodForm = $('form.new-food');

  if($newFoodForm.length > 0) {
    const $inputs = $newFoodForm.find('input, textarea, button');
    const $select = $newFoodForm.find('select');
    $inputs.prop('disabled', true);

    $select.on('change', () => $inputs.prop('disabled', false));
  }
});
