export const formatDate = (date: number): string => {
    
  return new Date(date).toLocaleDateString();
}