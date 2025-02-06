export const calculateDuration = (startDate: Date, endDate: Date | undefined | null): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  
  end.setDate(end.getDate() + 1);
  
  let months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth();
  
  if (end.getDate() < start.getDate()) {
    months--;
  }
  
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  let duration = '';
  if (years > 0) {
    duration += `${years} yıl`;
    if (remainingMonths > 0) duration += ` ${remainingMonths} ay`;
  } else if (remainingMonths > 0) {
    duration += `${remainingMonths} ay`;
  }
  
  return duration;
};

export const formatDate = (date: Date | undefined | null): string => {
  if (!date) return '';
  const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
};

export const calculateTotalExperience = (experiences: Array<{ startDate: Date; endDate?: Date; isCurrentJob?: boolean; }>): string => {
  let totalMonths = 0;

  experiences.forEach(exp => {
    const start = new Date(exp.startDate);
    const end = exp.isCurrentJob ? new Date() : new Date(exp.endDate!);
    
    end.setDate(end.getDate() + 1);
    
    let months = (end.getFullYear() - start.getFullYear()) * 12;
    months += end.getMonth() - start.getMonth();
    
    if (end.getDate() < start.getDate()) {
      months--;
    }
    
    totalMonths += months;
  });

  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  let duration = '';
  if (years > 0) {
    duration += `${years} yıl`;
    if (remainingMonths > 0) duration += ` ${remainingMonths} ay`;
  } else if (remainingMonths > 0) {
    duration += `${remainingMonths} ay`;
  }

  return duration;
}; 