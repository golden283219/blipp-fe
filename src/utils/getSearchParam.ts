export default (name: string): string | null => {
  const urlParams = new URLSearchParams(
    window.location.search
  );
  return urlParams.get(name);
};
