import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFileById, regenerateSummary } from "../api/files";
import Loader from "../components/Loader";
import SummaryView from "../components/SummaryView";
import { SUMMARY_TYPES } from "../constants";

const SummaryReview = () => {
  const { fileId } = useParams();
  const queryKey = `file-${fileId}`;
  const queryClient = useQueryClient();
  const [currentSummaryType, setCurrentSummaryType] = useState(
    SUMMARY_TYPES.short
  );
  const [rangeValue, setRangeValue] = useState("1");

  const regenerateSummaryMutation = useMutation({
    mutationFn: regenerateSummary,
    onSuccess: (response) => {
      queryClient.setQueryData([queryKey], (oldData) => {
        // Modify and return new data
        return {
          ...oldData,
          data: {
            ...oldData.data,
            data: {
              ...oldData.data.data,
              summary: {
                ...oldData.data.data.summary,
                [currentSummaryType]: response.data.data.summary,
              },
            },
          },
        };
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Something went wrong!");
    },
  });

  const onRangeChange = (e) => {
    const { value } = e.target;

    switch (value) {
      case "1":
        setCurrentSummaryType(SUMMARY_TYPES.short);
        setRangeValue("1");
        checkAndRegenerateSummaryIfRequired(SUMMARY_TYPES.short);
        break;
      case "2":
        setCurrentSummaryType(SUMMARY_TYPES.medium);
        setRangeValue("2");
        checkAndRegenerateSummaryIfRequired(SUMMARY_TYPES.medium);
        break;
      case "3":
        setCurrentSummaryType(SUMMARY_TYPES.long);
        setRangeValue("3");
        checkAndRegenerateSummaryIfRequired(SUMMARY_TYPES.long);
        break;
      default:
        setCurrentSummaryType(SUMMARY_TYPES.short);
        setRangeValue("1");
        checkAndRegenerateSummaryIfRequired(SUMMARY_TYPES.short);
    }
  };

  const checkAndRegenerateSummaryIfRequired = (newSummaryType) => {
    if (!summary[newSummaryType]) {
      regenerateSummaryMutation.mutate({
        fileId,
        summaryType: newSummaryType,
      });
    }
  };

  const fileQuery = useQuery({
    queryKey: [queryKey],
    queryFn: () => getFileById(fileId),
  });

  if (fileQuery.isPending) {
    <Loader />;
  }

  if (fileQuery.isError) {
    return "try again";
  }

  const processedFile = fileQuery.isFetched && fileQuery.data.data.data;
  if (!processedFile) {
    return <Loader />;
  }
  const { originalText, fileName, summary } = processedFile;
  return (
    <div>
      {regenerateSummaryMutation.isPending && <Loader />}
      <SummaryView
        fileName={fileName}
        originalContent={originalText}
        summary={summary[currentSummaryType]}
        currentSummaryType={currentSummaryType}
        onRangeChange={onRangeChange}
        rangeValue={rangeValue}
      />
    </div>
  );
};

export default SummaryReview;
