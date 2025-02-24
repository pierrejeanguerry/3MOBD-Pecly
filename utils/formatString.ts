export const formatName = (str: string | undefined) => {
  if (str)
    return str
      .split(/[\s-]+/)
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      .join(" ");
  return;
};

export const formatSpeciality = (str: string | undefined) => {
  if (str) return str[0].toUpperCase() + str.slice(1).toLowerCase();
  return;
};

export const formatMotive = (str: string | undefined) => {
  if (str) return str[0].toUpperCase() + str.slice(1).toLowerCase();
  return;
};

export const formatCaregiver = (str: string | undefined) => {
  if (str) return `Dr. ${formatName(str)}`;
  return;
};
