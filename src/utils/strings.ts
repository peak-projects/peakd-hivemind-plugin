export const prepare = (template: string, params: Object): string => {
  return template.replace(/{([^{}]*)}/g, function(group, name) {
    const param = params[name];
    return typeof param === 'string' || typeof param === 'number'
      ? `${param}`
      : group;
  });
};